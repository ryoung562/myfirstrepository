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
            sh "/kaniko/executor \
                --dockerfile `pwd`/test/Dockerfile \
                --context `pwd`/test \
                --destination=docker.io/rlkamradt/myfirstrepositorytest:latest"
          }
        }
    }
    stage('Test') {
      agent {
        kubernetes {
          label 'kaniko'
          idleMinutes 5
          yamlFile 'kaniko-pod.yaml'
          defaultContainer 'kaniko'
        }
      }
      steps {
        container(name: 'kubectl') {
          sh '''
          kubectl apply -n test -f mongodb.yaml
          kubectl delete -n test --ignore-not-found=true -f myfirstrepository.yaml
          kubectl apply -n test -f myfirstrepository.yaml
          kubectl delete -n test --ignore-not-found=true pod myfirstrepositorytest
          kubectl apply -n test -f myfirstrepositorytest.yaml
          kubectl wait -n test --for=condition=ready pod myfirstrepositorytest
          kubectl logs -n test myfirstrepositorytest -f
          export exit_code = kubectl get -n test pod myfirstrepositorytest \
            -o jsonpath=\
            '{.status.containerStatuses[0].lastState.terminated.exitCode}'
          echo $exit_code
          '''
        }
      }
    }
    stage('Deploy') {
      steps {
          echo 'Deploying'
      }
    }
  }
}
