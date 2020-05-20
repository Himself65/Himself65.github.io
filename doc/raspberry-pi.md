# [Raspberry Pi 4b](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) Development Doc

## Usage

### Image download

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

## Bluetooth <a href="#link-3">[^3]</a>

```bash
bluetoothctl
power on
agent on
scan on
pair $MAC_ADDRESS
trust $MAC_ADDRESS
```

## Documents

[[1]: Raspberry Pi Pinout, https://pinout.xyz/](https://pinout.xyz/)

[[2]: Luma, which support render text/images to display, https://github.com/rm-hull/luma.core](https://github.com/rm-hull/luma.core)

<a id="link-3"></a>
[[^3]: https://www.digikey.com/en/maker/blogs/raspberry-pi-wi-fi-bluetooth-setup-how-to-configure-your-pi-4-model-b-3-model-b](https://www.digikey.com/en/maker/blogs/raspberry-pi-wi-fi-bluetooth-setup-how-to-configure-your-pi-4-model-b-3-model-b)
