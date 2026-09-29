pipeline {
    agent any

    environment {
        IMAGE_NAME = "deebikanp/css-flexbox-grid-playground"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate application') {
            steps {
                bat '''
                    if not exist app\\index.html exit /b 1
                    if not exist app\\style.css exit /b 1
                    if not exist app\\script.js exit /b 1
                    if not exist docker\\Dockerfile exit /b 1
                '''
            }
        }

        stage('Build Docker image') {
            steps {
                bat '''
                    docker build -f docker\\Dockerfile -t %IMAGE_NAME%:%BUILD_NUMBER% .
                '''
            }
        }

        stage('Push Docker image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    bat '''
                        echo %DOCKER_TOKEN% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %IMAGE_NAME%:%BUILD_NUMBER%
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat '''
                    kubectl set image deployment/css-playground ^
                    css-playground=%IMAGE_NAME%:%BUILD_NUMBER% ^
                    -n css-playground

                    kubectl rollout status deployment/css-playground ^
                    -n css-playground ^
                    --timeout=180s
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}