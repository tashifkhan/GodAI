import { Ionicons } from "@expo/vector-icons";
import {
	Root,
	Trigger,
	Content,
	Item,
	ItemTitle,
	ItemIcon,
} from "zeego/dropdown-menu";

export type Props = {
	items: Array<{
		key: string;
		title: string;
		icon: string;
	}>;
	onSelect: (key: string) => void;
};

const DropDownMenu = ({ items, onSelect }: Props) => {
	return (
		<Root>
			<Trigger>
				<Ionicons name="ellipsis-horizontal" size={24} color={"#fff"} />
			</Trigger>
			<Content>
				{items.map((item) => (
					<Item key={item.key} onSelect={() => onSelect(item.key)}>
						<ItemTitle>{item.title}</ItemTitle>
						<ItemIcon
							ios={{
								name: item.icon,
								pointSize: 18,
							}}
						/>
					</Item>
				))}
			</Content>
		</Root>
	);
};
export default DropDownMenu;
