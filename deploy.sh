case "$1" in
  lib)
      yarn build-lib
      cp README.md dist/ngx-design-creator
      pushd dist/ngx-design-creator && npm publish
      popd
      ;;
  demo)
      yarn deploy-demo
      ;;
  *)
      echo $"Usage: $0 {lib|demo}"
      exit 1
 esac
