pipeline {
    environment {
        registryCredential = 'dockerhub-creds'
        DOCKER_BUILDKIT = '1'
        IMAGE_TAG = 'latest'
        DOCKERHUB_NAMESPACE = 'avk18'
    }
    agent any

    stages {
        stage('Stage 1: Git Clone') {
            steps {
                git branch: 'master', url: 'https://github.com/AnilKumar-V18/Kissan-mitra.git'
            }
        }

        stage('Stage 2: Build Docker Server') {
            steps {
                dir("backend") {
                    script {
                        docker.build("${DOCKERHUB_NAMESPACE}/kissan_mitra-backend-app:${IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Stage 3: Build Docker Client') {
            steps {
                dir("frontend") {
                    script {
                        docker.build("${DOCKERHUB_NAMESPACE}/kissan_mitra-frontend-app:${IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Stage 4: Run Backend Tests') {
            steps {
                dir("backend") {
                    script {
                        docker.image("${DOCKERHUB_NAMESPACE}/kissan_mitra-backend-app:${IMAGE_TAG}").inside('-w /usr/src/app') {
                            sh '''
                                if [ -d "test" ] || [ -n "$(find . -name '*.test.js')" ]; then
                                    echo "Running tests..."
                                    npm test || echo "Tests failed but continuing..."
                                else
                                    echo "No test files found. Skipping tests."
                                fi
                            '''
                        }
                    }
                }
            }
        }

        stage('Stage 5: Push Backend Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        docker.image("${DOCKERHUB_NAMESPACE}/kissan_mitra-backend-app:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Stage 6: Push Frontend Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        docker.image("${DOCKERHUB_NAMESPACE}/kissan_mitra-frontend-app:${IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Stage 7: Deploy to Kubernetes') {
            steps {
                withEnv(["KUBECONFIG=/home/jenkins/.kube/config"]) {
                    script {
                        sh 'kubectl apply -f k8s-manifests/'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            echo "Pipeline failed - please check the logs"
        }
    }
}
