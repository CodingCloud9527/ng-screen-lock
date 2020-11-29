process.env.GIT_AUTHOR_NAME = 'CodingCloud9527';
process.env.GIT_COMMITTER_NAME = 'CodingCloud9527';
process.env.GIT_AUTHOR_EMAIL = 'CodingCloud9527@gmail.com';
process.env.GIT_COMMITTER_EMAIL = 'CodingCloud9527@gmail.com';

module.exports = {
  preset: 'angular',
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'lib/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['lib/CHANGELOG.md'],
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        pkgRoot: 'dist/ng-screen-lock',
      },
    ],
  ],
};