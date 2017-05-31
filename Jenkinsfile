#!groovy
def project = 'f12-tech'
def DEPLOY_TIMEOUT = 600
def appName = 'tkhamilton'
def HIGHWINDS_ACCOUNT_HASH = 'k2q7f5s2'
def HIGHWINDS_ACCOUNT_ID = 'www.tkhamilton.com'
def HIGHWINDS_ACCOUNT_STATIC_ID = 'static.tkhamilton.com'
def HIGHWINDS_API_TOKEN = 'f7d5a88f180e71cfcb126809ff2ced141628628ebf50552dc732a3c6b56a9552'
def testNS = 'paradigm-test'
def stagingNS = 'paradigm-staging'
def prodNS = 'paradigm'
def devNS
def imageUrl
def imageTag
def gitCommit
def svcName = "${appName}"
def branch = "${env.BRANCH_NAME.toLowerCase()}"

try {
  notifyBuild('IN_PROGRESS', "Started")
  milestone()
  node('services-k8s') {
    stage('Checkout') {
      checkout scm
      gitCommit = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
      devNS = "dev-${appName}-${branch}"
      stash(includes: 'k8s/**', name: 'k8s')
    }

    stage('Build image') {
      imageTag = "${branch}.${env.BUILD_NUMBER}.${gitCommit}"
      imageUrl = "gcr.io/${project}/${appName}:${imageTag}"
      notifyBuild('IN_PROGRESS',"Building image ${imageUrl}")
      sh("docker build --build-arg BUILD_NUMBER=${BUILD_NUMBER} -t ${imageUrl} .")
      notifyBuild('IN_PROGRESS', "Image ${imageUrl} built")
    }

    // Disabled until tests don't fail
    // stage('Run tests') {
    //   sh("docker run -t ${imageUrl} npm test")
    // }

    stage('Push image to registry') {
      notifyBuild('IN_PROGRESS', "Pushing image ${imageUrl}")
      sh("gcloud auth activate-service-account --key-file /tmp/gcloud/credentials.json")
      sh("gcloud docker -- push ${imageUrl}")
      notifyBuild('IN_PROGRESS', "Image ${imageUrl} pushed")
    }
  }


  switch (env.BRANCH_NAME) {
    // Roll out to staging
    case "master":
        node('f12general') {
          stage("Deploy To Test") {
            lock(resource: 'tkhamilton-test', inversePrecedence: true) {
              unstash('k8s')
              sh("mkdir -p k8s/dist")
              // Change deployed image in test to the one we just built
              notifyBuild('IN_PROGRESS', "Deploying ${appName} to test")
              sh("sed 's#gcr.io/f12-tech/tkhamilton:latest#${imageUrl}#;s#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/staging/tkhamilton.deploy.yaml > ./k8s/dist/tkhamilton.deploy.${gitCommit}.yaml")
              sh("sed 's#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/services/tkhamilton.svc.yaml > ./k8s/dist/tkhamilton.svc.${gitCommit}.yaml")
              sh("kubectl --namespace=${testNS} apply -f k8s/dist/tkhamilton.svc.${gitCommit}.yaml --record")
              sh("kubectl --namespace=${testNS} apply -f k8s/dist/tkhamilton.deploy.${gitCommit}.yaml --record")

              try {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} verify-deployment ${appName} ${testNS}")
              }
              catch (e) {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} debug-deployment ${appName} ${testNS}")
                error("Deployment failed")
              }
            }
            notifyBuild('SUCCESSFUL', "Deployed to test")
            milestone()
          }
          milestone()
          stage("Deploy To Staging") {
            lock(resource: 'tkhamilton-staging', inversePrecedence: true) {
              unstash('k8s')
              sh("mkdir -p k8s/dist")
              // Change deployed image in staging to the one we just built
              notifyBuild('IN_PROGRESS', "Deploying ${appName} to staging")
              sh("sed 's#gcr.io/f12-tech/tkhamilton:latest#${imageUrl}#;s#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/staging/tkhamilton.deploy.yaml > ./k8s/dist/tkhamilton.deploy.${gitCommit}.yaml")
              sh("sed 's#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/services/tkhamilton.svc.yaml > ./k8s/dist/tkhamilton.svc.${gitCommit}.yaml")
              sh("kubectl --namespace=${stagingNS} apply -f k8s/dist/tkhamilton.svc.${gitCommit}.yaml --record")
              sh("kubectl --namespace=${stagingNS} apply -f k8s/dist/tkhamilton.deploy.${gitCommit}.yaml --record")

              try {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} verify-deployment ${appName} ${stagingNS}")
              }
              catch (e) {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} debug-deployment ${appName} ${stagingNS}")
                error("Deployment failed")
              }
            }
            notifyBuild('SUCCESSFUL', "Deployed to staging")
            milestone()
          }
        }
        milestone()
        notifyBuild('PAUSED', "Do you want to deploy to production?")
        input 'Continue to deploy to production?'
        milestone()
        stage("Deploy To Production") {
          lock('tkhamilton-production') {
            node('f12general') {
              unstash('k8s')
              sh("mkdir -p k8s/dist")
              // Change deployed image in staging to the one we just built
              notifyBuild('IN_PROGRESS', "Deploying ${appName} to production")
              sh("sed 's#gcr.io/f12-tech/tkhamilton:latest#${imageUrl}#;s#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/production/tkhamilton.deploy.yaml > ./k8s/dist/tkhamilton.deploy.${gitCommit}.yaml")
              sh("sed 's#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/services/tkhamilton.svc.yaml > ./k8s/dist/tkhamilton.svc.${gitCommit}.yaml")
              sh("kubectl --namespace=${prodNS} apply -f k8s/dist/tkhamilton.svc.${gitCommit}.yaml --record")
              sh("kubectl --namespace=${prodNS} apply -f k8s/dist/tkhamilton.deploy.${gitCommit}.yaml --record")


              try {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} verify-deployment ${appName} ${prodNS}")
              }
              catch (e) {
                sh("timeout.sh -t ${DEPLOY_TIMEOUT} debug-deployment ${appName} ${prodNS}")
                error("Deployment failed")
              }
            }
            notifyBuild('SUCCESSFUL', "Deployed to production")
            milestone()
          }
        }
        milestone()
        stage('Flush Caches') {
          node('services-k8s') {
            notifyBuild('IN_PROGRESS', "Flushing Highwinds Cache")
            sh("curl -svo /dev/null -X POST --data-binary '{\"list\":[{\"url\":\"//www.tkhamilton.com/\",\"recursive\":true},{\"url\":\"//static.tkhamilton.com/\",\"recursive\":true}]}' -H \"Content-Type: application/json\" -H \"X-Application-Id: ${HIGHWINDS_ACCOUNT_ID}\" -H \"Authorization: Bearer ${HIGHWINDS_API_TOKEN}\" https://striketracker.highwinds.com/api/v1/accounts/${HIGHWINDS_ACCOUNT_HASH}/purge")
            notifyBuild('IN_PROGRESS', "Highwinds Cache Flushed")
          }
        }
        break
    // Roll out a dev environment
    default:
        stage("Deploy to dev environment") {
          node('f12general') {
            unstash('k8s')
            sh("mkdir -p k8s/dist")
            notifyBuild('IN_PROGRESS', "Deploying ${appName} to dev namespace")
            // Create namespace if it doesn't exist
            sh("kubectl get ns ${devNS} || kubectl create ns ${devNS}")

            // Use public load balancing for dev branches
            sh("sed -i.bak 's#ClusterIP#LoadBalancer#' ./k8s/services/tkhamilton.svc.yaml")

            sh("sed 's#gcr.io/f12-tech/tkhamilton:latest#${imageUrl}#;s#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/dev/tkhamilton.deploy.yaml > ./k8s/dist/tkhamilton.deploy.${gitCommit}.yaml")
            sh("sed 's#_BUILD_NUMBER_#${BUILD_NUMBER}#;s#_GIT_SHA_#${gitCommit}#;s#_IMAGE_TAG_#${imageTag}#' ./k8s/services/tkhamilton.svc.yaml > ./k8s/dist/tkhamilton.svc.${gitCommit}.yaml")
            sh("kubectl --namespace=${devNS} apply -f k8s/dist/tkhamilton.svc.${gitCommit}.yaml --record")
            sh("kubectl --namespace=${devNS} apply -f k8s/dist/tkhamilton.deploy.${gitCommit}.yaml --record")

            try {
              sh("timeout.sh -t ${DEPLOY_TIMEOUT} verify-deployment ${appName} ${devNS}")
            }
            catch (e) {
              sh("timeout.sh -t ${DEPLOY_TIMEOUT} debug-deployment ${appName} ${devNS}")
              error("Deployment failed")
            }

            sh("while [ \$(kubectl get svc ${appName} -n ${devNS} -o json | jq .status.loadBalancer.ingress[0].ip) == null ]; do echo 'waiting for LB'; sleep 5; done")

            LB_IP = sh(script: "kubectl get svc ${appName} -n ${devNS} -o json | jq -r .status.loadBalancer.ingress[0].ip", returnStdout: true).trim()

            echo "Test your PR here: http://${LB_IP}/"
            notifyBuild('SUCCESSFUL', "Test your PR here: http://${LB_IP}/")
          }
        }
  }

} catch (e) {
  currentBuild.result = "FAILED"
  notifyBuild("FAILED", e.message)
  throw e
} finally {
  // Success or failure, always send notifications
  notifyBuild(currentBuild.result, 'Build finished')
}

def notifyBuild(String buildStatus = 'IN_PROGRESS', String message = 'In progress') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}] ${message}'"
  def summary = "${subject} (${env.BUILD_URL} ${env.BUILD_URL}console)"

  // Override default values based on build status
  if (buildStatus == 'IN_PROGRESS') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else if (buildStatus == 'PAUSED') {
    color = 'BLUE'
    colorCode = "#0000FF"
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)
}
