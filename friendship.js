const friendship = []
const push = (name, url, image = '', description = '') =>
  friendship.push({ name, url, image, description })

push('darkflames', 'https://dark-flames.com', 'darkflames.jpg')
push('ice1000', 'https://ice1000.org', 'ice1000.jpg')
push('Edward Elric', 'https://sasuke40.github.io', 'sasuke.jpg')
push('DIYgod', 'https://diygod.me', 'DIYgod.jpg')
push('太狼', 'https://lynvv.xyz', 'lynvv.jpg')
push('木子', 'https://blog.k8s.li', 'muzi502.png')
push('兔子鮮笙', 'https://blog.tuzi.moe', 'ryuuuuu.png')

module.exports = friendship
