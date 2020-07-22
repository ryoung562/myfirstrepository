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
                --dockerfile `pwd`/Dockerfile \
                --context `pwd` \
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
