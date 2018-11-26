package OpenSourceProjects_Storybook.buildTypes

import jetbrains.buildServer.configs.kotlin.v2017_2.*
import jetbrains.buildServer.configs.kotlin.v2017_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2017_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2017_2.triggers.vcs
import jetbrains.buildServer.configs.kotlin.v2017_2.triggers.retryBuild
import jetbrains.buildServer.configs.kotlin.v2017_2.triggers.VcsTrigger

object OpenSourceProjects_Storybook_Danger : BuildType({
    uuid = "759f0116-2f7d-4c03-8220-56e4ab03be3a"
    id = "OpenSourceProjects_Storybook_Danger"
    name = "Danger"

    params {
        password("env.DANGER_GITHUB_API_TOKEN", "credentialsJSON:9ac87388-d267-4def-a10e-3e596369f644")
        param("env.PULL_REQUEST_URL", "https://github.com/storybooks/storybook/%teamcity.build.branch%")
    }

    vcs {
        root(OpenSourceProjects_Storybook.vcsRoots.OpenSourceProjects_Storybook_HttpsGithubComStorybooksStorybookRefsHeadsMaster1)

        buildDefaultBranch = false
    }

    steps {
        script {
            name = "Danger"
            scriptContent = """
                #!/bin/sh

                set -e -x

                yarn
                yarn danger ci
            """.trimIndent()
            dockerImage = "node:%docker.node.version%"
        }
    }

    triggers {
        vcs {
            quietPeriodMode = VcsTrigger.QuietPeriodMode.USE_DEFAULT
            branchFilter = """
                +:*
                -:master
            """.trimIndent()
        }
        retryBuild {
            delaySeconds = 3600
        }
    }

    features {
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:5ffe2d7e-531e-4f6f-b1fc-a41bfea26eaa"
                }
            }
            param("github_oauth_user", "Hypnosphi")
        }
        feature {
            type = "pullRequests"
            param("filterAuthorRole", "EVERYBODY")
            param("authenticationType", "token")
            param("secure:accessToken", "credentialsJSON:5ffe2d7e-531e-4f6f-b1fc-a41bfea26eaa")
        }
    }

    requirements {
        doesNotContain("env.OS", "Windows")
    }

    cleanup {
        artifacts(days = 1)
    }
})
