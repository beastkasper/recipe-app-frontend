import {Flex} from "antd/lib";
import Link from "next/link";
import classes from "./TabBar.module.scss"
import {useRouter} from "next/router";
import Image from "next/image";
import Shef from "../../../../public/shef.svg"
import Add from "../../../../public/add.svg"
import Edit from "../../../../public/editor.svg"
const TabBar = () => {
    const { pathname } = useRouter()

    return <Flex gap={24} className={classes.tabBar_container} align="center">
        <Link className={pathname === "/" ? classes.tabBar_item_active : classes.tabBar_item} href="/">
            <Image src={Shef} alt="shef"/>
        </Link>
        <Link className={pathname === "/create" ? classes.tabBar_item_active : classes.tabBar_item} href="/create">
            <Image src={Add} alt="shef"/>
        </Link>
        <Link className={pathname === "/edit" ? classes.tabBar_item_active : classes.tabBar_item} href="/edit">
            <Image style={{ fill: "red" }} src={Edit} alt="shef"/>
        </Link>
    </Flex>
}
export default TabBar