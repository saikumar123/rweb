import React, {useState} from "react";

const Staking = (props) => {

  const [tableData, setTableData] = useState([
      {name:"MGT-ETH-LP",apy:"--%",total_pool:'10,00.47',stakable: '0 BPT', value_stakable: '0.00', earned:'0 DFX', isExpand:false},
      {name:"MYT-ETH-LP",apy:"--%",total_pool:'4860.47',stakable: '0 BPT', value_stakable: '0.00', earned:'0 DFX',isExpand:false},
      {name:"MGT-POOL",apy:"--%",total_pool:'8876.47',stakable: '0 BPT', value_stakable: '0.00', earned:'0 DFX', isExpand:false},
      
    ]);

    const showManageItem = (row, index) => {
      row.isExpand=!row.isExpand
      tableData[index]=row
      setTableData([...tableData])
    }

  return (
    <div class="row m-b-30 blueTxt">
      <div class="col-lg-12 m-b-15">
        <small class="tag-line">
          {" "}
          <i>Staking</i>
        </small>
        {props.txnRows.length === 0 &&
          <small class="tag-line-error">
            {"No transaction item found"}
          </small>
        }
      </div>
      <div class="col-lg-12 p0 pull-left smlTxt text-center">
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">
            Pool
        </div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">
            APY
        </div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">
            Total Pool Value
        </div>
        <div class="col-lg-1 col-sm-1 pull-left">
            Stakable
        </div>
        <div class="col-lg-2 col-sm-2 m-t-5 pull-left">
            Value Staked
        </div>
        <div class="col-lg-1 col-sm-1 m-t-5 pull-left">
            Earned
        </div>
      </div>

      {tableData.map(
        (row, index) => {
          return (

            <>
              <div class="col-lg-12 p0 pull-left text-center" className={'col-lg-12 p0 pull-left clrWhite'}>
                <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                  ${row.name}
                </div>
                <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                  ${row.apy}
                </div>
                <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                   ${row.total_pool}
                </div>
                <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                  {row.stakable}
                </div>
                <div class="col-lg-2 col-sm-2 m-t-5 pull-left pd-line">
                   ${row.value_stakable}
                </div>
                <div class="col-lg-1 col-sm-1 m-t-5 pull-left pd-line">
                   {row.earned}
                </div>
                <div class="col-lg-2 col-sm-2 m-t-25 pull-left">
                    
                  <a  onClick={() => showManageItem(row, index)} class="outline-btn success-out">
                    
                      {!row.isExpand ? 'Manage' : 'Close'}
                  </a>
                </div>
              </div>
              {/* className={row.isExpand ? 'slider' : 'slider open'} */}
              <div class="boxSlide" className={!row.isExpand ? 'slider' : 'slider open'}>
              <div className={!row.isExpand ? 'col-lg-12 pull-left boxborder' : 'col-lg-12 pull-left boxborderslide'}>
                <div className={!row.isExpand ? 'col-lg-12 pull-left contentform' : 'col-lg-12 pull-left contentformslide'}>
                <div className="col-lg-12 pull-left text-center p-d-30">{'To stake, get BPT tokens by depositing EURS and USDC into here.'}</div>
                  <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                    {/* <br/> */}
                    <i className="smlTxt">Balance:0 BPT</i>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="0.0"
                    />
                    <div className="col-lg-12 m-auto">
                      <button type="button" className="btn col-lg-12 m-t-15 btn-button btn-circular">
                        Stake
                      </button>
                    </div>
                  </div>
                <div className="col-lg-6 col-sm-6 m-b-10 pull-left">
                  <i className="smlTxt">Staked: 0 BPT</i>
                  <input
                      type="number"
                      className="form-control"
                      placeholder="0.0"
                  />
                  <div className="col-lg-11 m-auto">
                    <button type="button" className="btn col-lg-12 m-t-15 btn-button btn-circular">
                      Unstake
                    </button>
                  </div>
                  </div>
                  
                </div>
            </div>
              </div>
            </>
          )
        }
      )}
    </div>
  );

}

Staking.propTypes = {};

Staking.defaultProps = {};

export default Staking;