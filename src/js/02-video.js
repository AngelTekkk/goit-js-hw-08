import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const savedData = localStorage.getItem('videoplayer-current-time');
const parsedData = JSON.parse(savedData);

player.on('timeupdate', throttle(onPlay, 1000));

player.setCurrentTime(parsedData.seconds).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      break;

    default:
      break;
  }
});

function onPlay() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(
        'videoplayer-current-time',
        JSON.stringify({ seconds })
      );
      console.log(seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}
