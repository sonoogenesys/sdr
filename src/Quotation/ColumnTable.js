import { Table } from 'antd';
import React from 'react';
const { Column, ColumnGroup } = Table;

const ColumnTable = ({rowData}) => {
    const data = rowData.map((o, i)=>{
        o.index = i + 1;
        const supply = Number(o.sRate || 0);
        const erection = Number(o.eRate || 0);
        return {
            key: i,
            index: i + 1,
            name: o.name,
            hsn: o.hsn,
            uom: o.uom,
            qty: o.qty,
            sRate: supply,
            sAmount:supply * o.qty,
            eRate: erection,
            eAmount: erection * o.qty,
            tRate: supply + erection,
            tAmount: (supply + erection) * o.qty,
        };
    });
    const totalAmount = data.reduce((a, b)=> a + b.tAmount, 0)
    console.log(totalAmount)
    return (
        <div className="acclist-height-base">
            <Table pagination={false} key={"index"}
                   className={'table table-striped table-bordered dt-responsive nowrap action_icons'}
                   dataSource={data}>
                <Column title="S.no" dataIndex="index" key="index" />
                <Column width={'40%'} title="Product Description" dataIndex="name" key="name" />
                <Column width={'7%'} title="HSN" dataIndex="hsn" key="hsn" />
                <Column width={'7%'} title="UOM" dataIndex="uom" key="uom" />
                <Column width={'7%'} title="Qty" dataIndex="qty" key="qty" />
                <ColumnGroup width={'15%'} title="Supply" className={'text-center'}>
                    <Column title="Rate" dataIndex="sRate" key="sRate" />
                    <Column title="Amount" dataIndex="sAmount" key="sAmount" />
                </ColumnGroup>
                <ColumnGroup width={'15%'} title="Erection" className={'text-center'}>
                    <Column title="Rate" dataIndex="eRate" key="eRate" />
                    <Column title="Amount" dataIndex="eAmount" key="eAmount" />
                </ColumnGroup>
                <ColumnGroup width={'15%'} title="Total" className={'text-center'}>
                    <Column title="Rate" dataIndex="tRate" key="tRate" />
                    <Column title="Amount" dataIndex="tAmount" key="tAmount" />
                </ColumnGroup>
            </Table>
        </div>
    );
}
export default ColumnTable;