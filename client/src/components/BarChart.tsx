import React from "react";
import { Distribution } from "../types/distribution";
import { Chart, Series, Tooltip, Export, Legend } from "devextreme-react/chart";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  distribution: Distribution | undefined;
  title: string;
  name: string;
  seriesName: string;
};

type SeriesData = {
  arg: string;
  val: number;
}[];

const PieChart = ({ distribution, title, name, seriesName }: Props) => {
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

  const onPointClick = (arg: any) => {
    arg.target.select();
    navigate({
      pathname: "/colleges",
      search: `?${createSearchParams({ [name]: arg.target.argument })}`,
    });
  };

  return (
    <Chart title={title} dataSource={dataSource} onPointClick={onPointClick}>
      <Series type="bar" name={seriesName} />
      <Export enabled={true} />
      <Legend margin={0} horizontalAlignment="right" verticalAlignment="top" />
      <Tooltip enabled={true} />
    </Chart>
  );
};

export default React.memo(PieChart);
