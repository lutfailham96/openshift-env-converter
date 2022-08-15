#!/bin/bash

# Generate JSON of environment variable
# based on specific deployment config

DC=""

write_dc() {
  DC="${1}"
  echo "Get deployment config: ${DC}"
  oc get dc "${DC}" -o yaml > "/tmp/${DC}"
}

read_env() {
  echo "Generating JSON ..."
  node index.js "/tmp/${1}"
}

main() {
  write_dc "${1}"
  read_env "${1}"
}

main "${1}"
