# Linux Usage

> for Ubuntu 20.x

## Proxy

#### Git

```bash
# set
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

# unset
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#### Global

```bash
export http_proxy=http://127.0.0.1:1080
export https_proxy=http://127.0.0.1:1080

unset http_proxy
unset https_proxy
```

#### APT

```bash
sudo touch /etc/apt/apt.conf.d/proxy.conf
sudo vim /etc/apt/apt.conf.d/proxy.conf
```

```conf
Acquire {
  HTTP::proxy "http://127.0.0.1:8080";
  HTTPS::proxy "http://127.0.0.1:8080";
}
```

## Software Mirror Site

- https://mirrors.tuna.tsinghua.edu.cn/

if there's something wrong about key, try this

```bash
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys $UNKNOWN_KEY
```

## Zsh

https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH

## NVM

https://github.com/nvm-sh/nvm
