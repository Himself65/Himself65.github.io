# [Raspberry Pi 4b](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) Development Doc

## Usage

### Image downlaod

see https://www.raspberrypi.org/downloads/

and use [Rufus](https://rufus.ie/) to create bootable USB drives

### Raspi Config

```bash
sudo raspi-config
```

### I2C check

```bash
sudo apt-get install i2c-tools
sudo i2cdetect -y 1
# if it works well, there will some numbers instead of '--'
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- --
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
30: -- -- -- -- -- -- -- -- -- -- -- -- 3c -- -- --
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
70: -- -- -- -- -- -- -- --
```
## Documents

- Raspberry Pi Pinout, https://pinout.xyz/

- Luma, which support render text/images to display, https://github.com/rm-hull/luma.core
