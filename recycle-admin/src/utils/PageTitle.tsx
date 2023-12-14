import { FC } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface PageTitleProps {
  children: React.ReactNode;
}

function createPathChecker(pathname: string) {
  return function (route: string) {
    return pathname.startsWith(route);
  };
}

function setTitle(title: string) {
  return (document.title = `МинТруда ${title}`);
}

export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  const { pathname } = useLocation();
  const pathChecker = createPathChecker(pathname);

  useEffect(() => {
    if (pathChecker("/departments")) {
      setTitle("- Ведомства");
    } else if (pathChecker("/establishments")) {
      setTitle("- Учреждения");
    } else if (pathChecker("/events")) {
      setTitle("- Мероприятия");
    } else if (pathChecker("/users")) {
      setTitle("- Пользователи");
    } else if (pathChecker("/operator")) {
      setTitle("- Операторы");
    } else if (pathChecker("/coordinators")) {
      setTitle("- Координаторы");
    } else if (pathChecker("/recipients")) {
      setTitle("- Получатели");
    } else if (pathChecker("/groups")) {
      setTitle("- Группы");
    } else if (pathChecker("/profile")) {
      setTitle("- Профиль");
    } else {
      setTitle("АРМ");
    }
  }, [pathname]);

  return children;
};
