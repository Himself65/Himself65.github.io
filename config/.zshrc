# For WSL2
# Get Host IP
export windows_host=`ipconfig.exe | grep -n4 WSL  | tail -n 1 | awk -F":" '{ print $2 }'  | sed 's/^[ \r\n\t]*//;s/[ \r\n\t]*$//'`

# Suppose you proxy port is 1234
export ALL_PROXY=http://$windows_host:1234
export HTTP_PROXY=$ALL_PROXY
export http_proxy=$ALL_PROXY
export HTTPS_PROXY=$ALL_PROXY
export https_proxy=$ALL_PROXY

# Git Proxy
if [ "`git config --global --get https.proxy`" != "http://$windows_host:1234" ]; then
  git config --global https.proxy http://$windows_host:1234
fi

if [ "`git config --global --get http.proxy`" != "http://$windows_host:1234" ]; then
  git config --global http.proxy http://$windows_host:1234
fi

# NVM config
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
sshd_status=$(service ssh status)
if [[ $sshd_status = *"is not running"* ]]; then
  sudo service ssh --full-restart
