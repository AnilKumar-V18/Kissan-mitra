pipeline {
    environment {
        registryCredential = 'docker'
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
                        server_image = docker.build("avk18/kissan_mitra-backend-app:latest").imageId()
                    }
                }
            }
        }

        stage('Stage 3: Build Docker Client') {
            steps {
                dir("frontend") {
                    script {
                        client_image = docker.build("avk18/kissan_mitra-frontend-app:latest").imageId()
                    }
                }
            }
        }

        stage('Stage 3.5: NPM Testing') {
            steps {
                dir("backend") {
                    sh 'npm install'
                    sh 'npm run test'
                }
            }
        }

        stage('Stage 4: Push Server Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        docker.image("avk18/kissan_mitra-backend-app:latest").push()
                    }
                }
            }
        }

        stage('Stage 5: Push Client Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        docker.image("avk18/kissan_mitra-frontend-app:latest").push()
                    }
                }
            }
        }

        stage('Stage 6: Ansible Deployment to Machine') {
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
}
