# Contributing

We thank you for your interest in contributing to PersonaSpace and are appreciative for your support and opportunity to work with others. This document will guide you through the process.

## Code of Conduct

PersonaSpace has adopted a code of conduct that all contributors are expected to adhere to. Please read the [CODE_OF_CONDUCT](https://github.com/personaspace/node-server-acl/blob/master/CODE_OF_CONDUCT.md) in order to understand hat will and will not be tolerated.

## Guide
For a smooth contribution process, please follow the following instructions.

### Fork

Fork the project [on GitHub](https://github.com/personaspace/node-server-acl) and check out
your copy.

```sh
$ git clone git@github.com:your_username/node-server-acl.git
$ cd node
$ git remote add upstream git://github.com/personaspace/node-server-acl.git
```

### Branch

Okay, so you have decided on the proper branch.  Create a feature branch
and start hacking:

```sh
$ git checkout -b my-feature-branch -t origin/dev
```

(Where v0.10 is the latest stable branch as of this writing.)


### Commit

Make sure git knows your name, email address, and signature:

```sh
$ git config --global user.name your_name
$ git config --global user.email your_emailaddress
$ git config --global user.signedkey your_commit_signature
```

For help on creating and getting your sommit signature, check out [Signing Commits](https://help.github.com/articles/signing-commits/) on Github User Documentation.

Writing good commit logs is important.  A commit log should describe what
changed and why.  Follow these guidelines when writing one:

1. The first line should be 50 characters or less and contain a short
   description of the change prefixed with the name of the changed
   subsystem (e.g. "net: add localAddress and localPort to Socket").
2. Keep the second line blank.
3. Wrap all other lines at 72 columns.

A good commit log looks like this:

```
subsystem: explaining the commit in one line

Body of commit message is a few lines of text, explaining things
in more detail, possibly giving some background about the issue
being fixed, etc etc.

The body of the commit message can be several paragraphs, and
please do proper word-wrap and keep columns shorter than about
72 characters or so. That way `git log` will show things
nicely even when it is indented.
```

The header line should be meaningful; it is what other people see when they
run `git shortlog` or `git log --oneline`.

Check the output of `git log --oneline files_that_you_changed` to find out
what subsystem (or subsystems) your changes touch.

PersonaSpace only accepts signed commits, so be sure to sign your commits and follow the commit practices above.

```
$ git commit -S -m "your commit message..."
```

### Rebase

Use `git rebase` (not `git merge`) to sync your work from time to time.

```sh
$ git fetch upstream
$ git rebase upstream/v0.10  # or upstream/master
```


### Testing

Bug fixes and features should come with tests.  Add your tests in the
test/simple/ directory.  Look at other tests to see how they should be
structured (license boilerplate, common includes, etc.).

```sh
$ npm test
```

Make sure the linter is happy and that all tests pass.  Please, do not submit
patches that fail either check.

You can automatically fix linting errors, using `lint:fix` script.
```sh
$ npm run lint:fix
```

### Push commits

```sh
$ git push origin my-feature-branch
```

Go to https://github.com/your_username/node-server-acl and select your feature branch.  Click
the 'Pull Request' button and fill out the form.

Pull requests are usually reviewed within a few days.  If there are comments
to address, apply your changes in a separate commit and push that to your
feature branch.  Post a comment in the pull request afterwards; GitHub does
not send out notifications when you add commits.
