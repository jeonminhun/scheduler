import styles from "./layout.module.scss";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  // { children }: { children: React.ReactNode }
  return (
    <div className={styles.layout}>
        <Header />
      <div className={styles.body}>
        <Sidebar/>
        <main className={styles.main}>
          <Outlet/>
          {/* {children} */}
          </main>
      </div>
    </div>
  );
}


export default Layout;
