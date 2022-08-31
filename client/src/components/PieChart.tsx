import React from "react";
import { Distribution } from "../types/distribution";
import PieChartDevExtreme, {
  Legend,
  Series,
  Export,
  HoverStyle,
  Tooltip,
} from "devextreme-react/pie-chart";
import { useNavigate, createSearchParams } from "react-router-dom";

type Props = {
  distribution: Distribution | undefined;
  title: string;
  name: string;
};

type SeriesData = {
  arg: string;
  val: number;
}[];

const PieChart = ({ distribution, title, name }: Props) => {
  const dataSource: SeriesData | null = React.useMemo(
    () =>
      distribution === undefined
        ? null
        : Object.keys(distribution).map((d) => ({
            arg: d,
            val: distribution[d],
          })),
    [distribution]
  );
  const navigate = useNavigate();

  const customizeTooltip = (arg: any) => {
    return {
      text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
    };
  };

  const onPointClick = (arg: any) => {
    arg.target.select();
    navigate({
      pathname: "/colleges",
      search: `?${createSearchParams({ [name]: arg.target.argument })}`,
    });
  };

  return (
    <PieChartDevExtreme
      type="doughnut"
      title={title}
      palette="Material"
      dataSource={dataSource}
      onPointClick={onPointClick}>
      <Series>
        <HoverStyle color="#ffd700" />
      </Series>
      <Export enabled={true} />
      <Legend margin={0} horizontalAlignment="right" verticalAlignment="top" />
      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
    </PieChartDevExtreme>
  );
};

export default React.memo(PieChart);
