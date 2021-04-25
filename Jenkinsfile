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
          git 'https://github.com/rkamradt/myfirstrepository'
          container(name: 'kaniko') {
            sh "/kaniko/executor \
                --dockerfile `pwd`/Dockerfile \
                --context `pwd` \
                --destination=docker.io/rlkamradt/myfirstrepository:latest"
          }
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
