const minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
const hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
const time = `${hours}:${minutes}`;

const month = new Date().getMonth() + 1 < 9 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
const date = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
const today = `${new Date().getFullYear()}-${month}-${date}`;
export { time, today };
