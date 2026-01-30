# General


## Cloning

This project uses Playwright for visual regression testing, so the repo history can get large with screenshots. It is recommended to clone shallowly, since historic screenshots will inflate the size of the local repo:

```sh
# Clone with only the latest commit
git clone --depth 1 https://github.com/jimhigson/hohjs.git
```

`pnpm dev:game` - run the game for dev
`pnpm check` - run checks
`pnpm playwright test` - run e2e/visual regression tests

# Artwork
The Sprites file is `gfx/sprites.iff`. It is edited in Amiga IFF format using [PydPainter](https://pydpainter.org),
and converted to modern png for loading into the browser using a script:

```sh
pnpm iff2png
```

`iff2png` requires several dependencies to be installed, such as imagemagick and ffmpeg, and will log an error if these are not available

# Tauri

Tauri builds to native executables for these platforms:

## Building and developing with Tauri

```sh
pnpm tauri dev # - like vite dev
pnpm tauri build # -like vite build
cd src-tauri && cargo build # building rust side side
```

## Updating Tauri

`pnpm tauri info` - gets info on packages and other stuff installed
`pnpm up --latest "@tauri-apps/*` - update node packages for tauri
`cd src-tauri; cargo update` - update rust packages
`fish_add_path ~/.rustup/toolchains/stable-aarch64-apple-darwin/bin` - (with fish) to put rustup instlled stuff on the path - adjust for shell

## Build and dev for ios

On Mac, to install dependencies with `brew`:
```sh
brew install cocoapods - (init couldn't install it)
brew install rustup 
pnpm tauri ios init # set up for ios 

# with rustup installed as above:

rustup target add aarch64-apple-ios-sim # to instal stuff needed to compile for iOS
```

```sh
rustup default stable - to set rust up with default target

pnpm tauri ios dev # launch in dev mode
```

# Troubleshooting

For more info on developing, pls ask in [the Discord server](https://discord.gg/Se5Jznc2jm)