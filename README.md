# Conference PWA

## Prerequisites
1. Install Hugo (non-extended version is enough) via [official website](https://gohugo.io/installation/)
2. Install git via [official website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Running Locally
1. Clone our repo with `git clone  https://github.com/mercypl0x/conference.git`
2. Run `hugo server` to run the site locally at `http://localhost:1313/`
3. Note that Hugo doesn't support directory listing, which means URLs such as `http://localhost:1313/materials/en/` will appear to work even though the files are there.

## Building and Deploying
1. Clone our repo with `git clone https://github.com/mercypl0x/conference.git`
2. Delete `public` folder if it exists
3. Run `hugo` to generate webpage into `public/`.
4. Run `gencache.sh` script to generate a list of files for service worker cache, which is used for the PWA.
  The list of files will be inserted into `public/sw.js`. For more details, see the PWA section below.
5. The generated `public` directory can then be uploaded to any static file host.

## Customizing
### Menu
The menu is defined in `config.toml`.
New menu items can be added by adding new `[[menu.main]]` blocks to the file.
URLs in the menu config are the path from the Hugo root path, Hugo will make them relative for each page when building.
To reorganize the order of the menu items change the `weight` of the menu.
Items with a higher weight will appear later in the menu.

### PWA
The PWA description and other information can be customized in the manifest for the PWA, which the defines name, description, icons, icons and more, which can be found in `static/manifest.json`.

The PWA caching strategy is currently configured to first attempt requesting the file, if that fails within 400 ms, it will use the offline cache instead.

The list of files to cache for the PWA need to be generated after building the website with Hugo.
A Bash version of the script exists (`gencache.sh`).
To configure which files are excluded from the cache, the script can be modified.
The file filter is located in the beginning of the script and new lines of the same format can be added to add filters.
Running the script will modify `public/sw.js`, and will only work if the gencache script has not already been run.

## Acknowledgment

This project is based on the IAWEB-project by Ožbej Golob and his team: `https://github.com/ozbej/IAWEB-project.git`.
