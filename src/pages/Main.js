import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchStockStart } from '../redux/stock/stock.actions';
import { selectCurrentStock } from '../redux/stock/stock.selectors';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import formatDate from '../helper/formatDate';
import styled from 'styled-components/macro';

const StyledSelect = styled.select`
  margin-right: 20px;
  padding: 5px 10px;
`;

const StyledPicker = styled.input`
  padding: 5px 10px;
`;

const Main = () => {
  const dispatch = useDispatch();
  const stock = useSelector(state => state.stock);

  const [selectedStock, setSelectedStock] = useState('apple');
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchStockStart(selectedStock));
  }, [dispatch, selectedStock]);

  console.log(stock);

  if(stock.errorMessage) {
    return <>{stock.errorMessage}</>;
  }

  if (!stock.stock) {
    return <>Loading</>;
  }


  const performance = stock.stock.performance
    .reduce((acc, current) => {
      const prevAmount = acc.length > 0 ? acc[acc.length - 1][1] : 10_000;
      return [
        ...acc,
        [new Date(current[0]), prevAmount + (prevAmount * current[1]) / 100],
      ];
    }, [])
    .filter((item) => item[0] < endDate);

  const visibleIndex = parseInt(performance.length / 8);

  const chartData = performance.filter(
    (item, index) => index % visibleIndex === 0
  );

  console.log(chartData);

  const options = {
    title: {
      text: stock.companyName,
    },
    xAxis: {
      categories: chartData.map((data) => data[0].toDateString()),
    },
    series: [
      {
        data: chartData,
      },
    ],
  };

  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div>
        <StyledSelect
          name="Select stock"
          defaultValue="apple"
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="apple">Apple</option>
          <option value="amazon">Amazon</option>
          <option value="tesla">Tesla</option>
        </StyledSelect>
        <StyledPicker
          onChange={(e) => {
            console.log(e.target.value);
            setEndDate(new Date(e.target.value));
          }}
          type="date"
          value={formatDate(endDate || performance[performance.length - 1][0])}
        />
      </div>
    </>
  );
};

export default Main;
