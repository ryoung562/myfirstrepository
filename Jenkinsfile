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
          git 'https://github.com/ryoung562/myfirstrepository'
          container(name: 'kaniko') {
            sh "/kaniko/executor \
                --dockerfile `pwd`/Dockerfile \
                --context `pwd` \
                --destination=docker.io/rickstyle/myfirstrepository:latest"
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
