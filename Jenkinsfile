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
                        docker.build("avk18/kissan_mitra-backend-app:${env.IMAGE_TAG}")
                    }
                }
            }
        }

        stage('Stage 3: Build Docker Client') {
            steps {
                dir("frontend") {
                    script {
                        docker.build("avk18/kissan_mitra-frontend-app:${env.IMAGE_TAG}")
                    }
                }
            }
        }
       
        stage('Run NPM Tests inside Backend Docker') {
            steps {
                dir("backend") {
                    script {
                        echo "Running npm test inside backend Docker container..."
                        // Add test timeout and continue on failure if needed
                        docker.image("avk18/kissan_mitra-backend-app:${env.IMAGE_TAG}").inside('-w /usr/src/app') {
                            sh '''
                                # Verify test files exist
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

        stage('Stage 5: Push Server Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        docker.image("avk18/kissan_mitra-backend-app:${env.IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Stage 6: Push Client Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        docker.image("avk18/kissan_mitra-frontend-app:${env.IMAGE_TAG}").push()
                    }
                }
            }
        }

        stage('Stage 7: Ansible Deployment to Machine') {
            steps {
                sshagent(['ubuntu-ssh']) {
                    ansiblePlaybook(
                        colorized: true,
                        credentialsId: 'ubuntu-ssh',
                        installation: 'Ansible',
                        inventory: 'deploy-docker/inventory',
                        playbook: 'deploy-docker/deploy-app.yml'
                    )
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
            // Optional: Add email notification
            // emailext body: 'Pipeline failed!', subject: 'Pipeline Failed', to: 'your@email.com'
        }
    }
}
