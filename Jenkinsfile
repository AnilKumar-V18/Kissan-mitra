pipeline{
    environment{
            server_image = ""
            client_image= ""
            registryCredential='docker'
    }
    agent any
    stages{
        stage('Stage 1: Git Clone'){
            steps{
                git branch: 'master', url: 'https://github.com/AnilKumar-V18/Kissan-mitra.git'
            }
        }
        
        stage('Stage 2: Build Docker Server'){
            steps{
                dir("backend"){
                    script{
                        server_image= docker.build "avk18/kissan_mitra-backend-app:latest"
                    }
                }
            }
        }
        stage('Stage 3: Build Docker Client'){
            steps{
                dir("frontend"){
                    script{
                        client_image= docker.build "avk18/kissan_mitra-frontend-app:latest"
                    }
                }
            }
        }
        stage('Stage : npm testing'){
            steps{
                dir("backend"){
                    sh 'npm i'
                    sh 'npm run test'
                }
            }
        }
        
        
        stage('Stage 4: Push Server Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'docker') {
                        server_image.push()
                    }
                }
            }
        }
        stage('Stage 5: Push Client Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', 'docker') {
                        client_image.push()
                    }
                }
            }
        }
        stage('Stage 6: Ansible Deployment to machine'){
            steps{
                
                ansiblePlaybook becomeUser: 'null', colorized: true, credentialsId: 'docker', installation: 'Ansible', inventory: 'deploy-docker/inventory', playbook: 'deploy-docker/deploy-app.yml', sudoUser: 'null'
            
            }          
        }   
    }
}
