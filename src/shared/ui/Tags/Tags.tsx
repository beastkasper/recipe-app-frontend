import {Flex, Typography} from "antd/lib";
import classes from "./Tags.module.scss"

const Tags = () => {

    const tagsItem: string[] = ["Все рецепты", "Супы", "Коктейли", "ШАШлыки", "Баранинец", "Баранинец", "Баранинец"]

    return <Flex gap={12} style={{ overflow: "hidden", flexWrap: "nowrap", width: 700, }}> {tagsItem.map(t => <Typography.Text
        key={t} className={classes.tag}>{t}</Typography.Text>)}</Flex>
}
export default Tags;