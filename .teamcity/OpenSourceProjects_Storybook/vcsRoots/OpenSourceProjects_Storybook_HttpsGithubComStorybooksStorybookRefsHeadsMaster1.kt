package OpenSourceProjects_Storybook.vcsRoots

import jetbrains.buildServer.configs.kotlin.v2017_2.*
import jetbrains.buildServer.configs.kotlin.v2017_2.vcs.GitVcsRoot

object OpenSourceProjects_Storybook_HttpsGithubComStorybooksStorybookRefsHeadsMaster1 : GitVcsRoot({
    uuid = "5cacf90a-381a-4c73-9aa3-57f6439b545e"
    id = "OpenSourceProjects_Storybook_HttpsGithubComStorybooksStorybookRefsHeadsMaster1"
    name = "https://github.com/storybooks/storybook#refs/heads/master (1)"
    url = "git@github.com:storybooks/storybook.git"
    branch = "refs/heads/next"
    authMethod = uploadedKey {
        userName = "git"
        uploadedKey = "Storybook bot"
    }
})
