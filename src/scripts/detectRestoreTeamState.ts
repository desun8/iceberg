import Persistence from "./Persistence";

const detectRestoreTeamState = () => {
  const href = window.location.pathname;
  const employeePage = /team-inner/;
  const teamPage = /team/;
  const isEmployeePage = href.search(employeePage) !== -1;
  const isTeamPage = href.search(teamPage) !== -1;

  if (isEmployeePage) {
    Persistence.set("restore", true);
  } else if (isTeamPage) {
    console.log("Страница команды. Ничего не делаем.");
  } else {
    Persistence.clear();
  }
};

export default detectRestoreTeamState;
