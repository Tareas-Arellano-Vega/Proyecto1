pipeline {
    agent any
    
    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "$NODEJS_HOME/bin:$PATH"
    }
    
    stages {
        stage('Build and Test API') {
            steps {
                dir('api') {
                    sh 'pip install -r requirements.txt'
                    // No hay migraciones específicas para ejecutar
                }
            }
        }
        
        stage('Build React Native App') {
            steps {
                dir('app') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run API Tests') {
            steps {
                dir('api') {
                    sh 'pytest api_tests.py'
                }
            }
        }
        
        stage('Run React Native Tests') {
            steps {
                dir('app') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir('api') {
                    sh 'python api.py &'  // Ejemplo básico para ejecutar api.py en segundo plano
                }
                
                dir('app') {
                    // Puedes agregar comandos específicos para desplegar tu app React Native
                }
            }
        }
    }
}

