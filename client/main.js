import './style.css';
import getData from './getData';

getData().then((data) => {
  console.log(data);
  document.querySelector('#table-data').innerHTML = `
  ${data
    .map((item) => {
      return `<tr class="player">
          <td>${item.nickName}</td>
          <td>${item.email}</td>
          <td>${item.registrationDate}</td>
          <td>${item.status}</td>
        </tr>`;
    })
    .join('')}
`;
});
