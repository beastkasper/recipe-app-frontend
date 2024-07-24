import {Flex} from "antd/lib";
import Link from "next/link";
import classes from "./TabBar.module.scss"
import {useRouter} from "next/router";
const TabBar = () => {
    const { pathname } = useRouter()

    return <Flex gap={24} className={classes.tabBar_container} align="center">
        <Link className={pathname === "/" ? classes.tabBar_item_active : classes.tabBar_item} href="/">
            <img src="/shef.svg" alt="shef"/>
        </Link>
        <Link className={pathname === "/create" ? classes.tabBar_item_active : classes.tabBar_item} href="/create">
            <img src="/add.svg" alt="shef"/>
        </Link>
        <Link className={pathname === "/edit" ? classes.tabBar_item_active : classes.tabBar_item} href="/edit">
            <img style={{ fill: "red" }} src="/editor.svg" alt="shef"/>
        </Link>
    </Flex>
}
export default TabBar