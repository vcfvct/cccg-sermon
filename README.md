# Chinese Christian Church Germantown Sermon Archive.
* 德国镇基督教会讲道存档

## Build
* it is using the CRA(create-react-app).
* run `npm run bd` to build and deploy.

## Hosting
* this is hosted on [this repo's github pages](https://vcfvct.github.io/cccg-sermon). 
  * there's a `homepage:"."` at the package.json to make sure the stati resources has corrent path when hosted on Github Pages.
  * the resources need to start with `./` in code to get correct path.

## CNAME
* the custom domain `sermon.cccgermantown.org` is added to the `build/CNAME` file before deployment so github do not wipe out the domain each time..
