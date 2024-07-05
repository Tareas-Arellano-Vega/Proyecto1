pipeline {
    agent any
    
    stages {
        stage('Build API') {
            steps {
                dir("api") {
                    sh 'pip install -r requirements.txt'
                }
            }
        }

    

        
        stage('Build React Native App') {
            steps {
                dir('app') {
                    // Asegurarse de que la versión de Node.js esté configurada correctamente
                    sh 'node --version'
                    // Ejecutar npm install para instalar dependencias
                    sh 'npm install'
                    // Ejecutar otros comandos de npm según sea necesario
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('api') {
                    sh 'pytest'
                }
                dir('app') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Ejemplo de despliegue de API
                dir('api') {
                    sh 'chmod +x deploy_script.sh' // Dar permisos de ejecución al script de despliegue si es necesario
                    sh './deploy_script.sh' // Ejecutar script de despliegue de la API
                }
                
                // Ejemplo de despliegue de App React Native (ejemplo ficticio)
                dir('app') {
                    // Puedes agregar aquí comandos específicos para desplegar tu app React Native
                    // Por ejemplo, compilar APK, enviar a servicios de despliegue como Firebase, etc.
                }
            }
        }
    }
}
