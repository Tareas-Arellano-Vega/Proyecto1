pipeline {
    agent any
    
    stages {
        stage('Build API') {
            steps {
                dir('api') {
                    sh 'pip install -r requirements.txt' // Instalar dependencias de la API
                    sh 'python manage.py migrate' // Ejecutar migraciones si es necesario
                }
            }
        }
        
        stage('Build React Native App') {
            steps {
                dir('app') {
                    sh 'npm install' // Instalar dependencias de la app React Native
                    sh 'npm run build' // Construir la app React Native
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('api') {
                    sh 'pytest' // Ejecutar pruebas de la API
                }
                dir('app') {
                    sh 'npm test' // Ejecutar pruebas de la app React Native
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Aquí puedes agregar comandos para desplegar tu API y tu app React Native
                // Por ejemplo, despliegue a un servidor, compilación de artefactos, etc.
                // sh 'deploy_script.sh'
            }
        }
    }
}

