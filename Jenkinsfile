pipeline {
  agent any
  stages {
    stage('Build') {
        agent {
          kubernetes {
            label 'kaniko'
            idleMinutes 5
            yamlFile 'kaniko-pod.yaml'
            defaultContainer 'kaniko'
          }
        }
        steps {
          sh "/kaniko/executor \
                --context=git://github.com/rkamradt/myfirstrepository.git#refs/heads/master \
                --dockerfile=Dockerfile \
                --verbosity=debug \
                --destination=docker.io/rlkamradt/myfirstrepository:latest"
        }
    }
    stage('Test') {
      steps {
          echo 'Testing'
      }
    }
    stage('Deploy') {
      steps {
          echo 'Deploying'
      }
    }
  }
}
