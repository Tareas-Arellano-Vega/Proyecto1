pipeline {
    agent any

    environment {
        NODEJS_VERSION = 'node' // Esta es la versión que configuraste con nvm
        NVM_DIR = '/var/lib/jenkins/.nvm' // Ruta donde está instalado nvm
        PATH = "$NVM_DIR/versions/node/$NODEJS_VERSION/bin:$PATH"
    }
    
    stages {
        stage('Build API') {
            steps {
                dir("api") {
                    sh 'pip install -r requirements.txt'
                }
            }
        }

        
        stage('Setup Environment') {
            steps {
                script {
                    // Cargar nvm
                    def nvmHome = env.NVM_DIR
                    def nvmSh = "${nvmHome}/nvm.sh"
                    if (!fileExists(nvmSh)) {
                        error("Cannot find nvm.sh in ${nvmHome}")
                    }
                    env.NODE_VERSION = sh(script: "source ${nvmSh} && nvm alias default ${NODEJS_VERSION} && nvm use default && node --version", returnStdout: true).trim()
                    echo "Using Node.js version: ${env.NODE_VERSION}"
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
