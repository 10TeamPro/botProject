# Contributing

## Request for changes/ Pull Requests
You first need to create a fork of the [botProject](https://github.com/10TeamPro/botProject/) repository to commit your changes to it. Methods to fork a repository can be found in the [GitHub Documentation](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

Then add your fork as a local project:

```sh
# Using HTTPS
git clone https://github.com/10TeamPro/botProject.git
# Using SSH
git clone git@github.com:10TeamPro/botProject.git
```

> [Which remote URL should be used ?](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories)
Then, go to your local folder

```sh
cd botProject
```

Add git remote controls :

```sh
# Using HTTPS
git remote add fork https://github.com/YOUR-USERNAME/10TeamPro/botProject.git
git remote add upstream https://github.com/10TeamPro/botProject.git
# Using SSH
git remote add fork git@github.com:YOUR-USERNAME/10TeamPro/botProject.git
git remote add upstream git@github.com/10TeamPro/botProject.git
```

You can now verify that you have your two git remotes:

```sh
git remote -v
```

## Receive remote updates
In view of staying up to date with the central repository :

```sh
git pull upstream master
```

## Choose a base branch
Before starting development, you need to know which branch to base your modifications/additions on
| Type of change | Branches | Branch from | Merge to(PR) |
| --- | --- | --- | --- |
| Bug fix | hotfix | main | develop |
| Add Features(Personal) | feature<M/E/J>/<> | develop | develop |
| Add Features(Team) | feature/(name)-(role) | develop or feature | feature/(name) |

Commit your changes, then push the branch to your fork with `git push -u fork` and open a pull request on [our template](https://github.com/10TeamPro/botProject/.github/PULL_REQUEST_TEMPLATE/PULL_REQUEST_TEMPLATE.md) following the template provided.
