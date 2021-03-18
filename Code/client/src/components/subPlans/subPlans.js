import React,{useState,useEffect} from 'react';
import './style.css';
import Nav from '../Navbar/nav';
import {NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';

function SubsPlans(props)
{
 const [subs_plans, setSubsPlans]=useState([]);
 const [weekly_subs_plans, setWeeklySubsPlans]=useState([]);
 const [monthly_subs_plans, setMonthlySubsPlans]=useState([]);
 const [error, setError] = useState(null);

 const fetchSubsPlans = async () => {
	setError(null);
	axios.get('http://localhost:4000/subs_plans', {}).then(response => {

    const subs_plans = response.data.subs_plans;
    setSubsPlans(subs_plans);

    const weekly_subs_plans = subs_plans.filter(plan => plan.PlanType == "Weekly Plans");
    setWeeklySubsPlans(weekly_subs_plans);

    const monthly_subs_plans = subs_plans.filter(plan => plan.PlanType == "Monthly Plans");
    setMonthlySubsPlans(monthly_subs_plans);

    }).catch(err => {
      if (err.response.status === 401)
		  setError(error.response.data.message);
      else
		  setError("Something went wrong. Please try again later.");
    });
 }

 function handlePlanSelect(planId, planSize, planPrice)
 {
   props.setPlanId(planId);
   props.setSubsCount(planSize);
   props.setPlanPrice(planPrice);
   props.setMessage([]);
   props.history.push('/home');
 }


  useEffect(()=>{
    fetchSubsPlans();
  },[]);

  return (
    <div className="row">
    <Nav />
    <main>
    <div className="plansBox">
      <div className="weeklyBox">
        <div className="plantitle">Weekly Plan</div>
        {
          weekly_subs_plans.map(plan => {
              return(
                  <TouchableOpacity onPress={() => handlePlanSelect(plan.PlanId, plan.PlanSize, plan.PlanPrice)} disabled={props.itemsCount > plan.PlanSize}>
                    <div className="subsPlanblock">
                    <div className="subsPlanDescBlock" style={{opacity: 1.2 - Math.floor(props.itemsCount>plan.PlanSize)}}>
                      <div className="planName">{plan.PlanName}</div>
                      <div className="planDesc">{plan.PlanDescription}</div>
                    </div>
                    <div className="subsPlanPriceBlock">
                      {
                        (plan.PlanId != props.selectedPlanId) ?
                        <div className="planPrice"  style={{opacity: 1.2 - Math.floor(props.itemsCount>plan.PlanSize)}}>${plan.PlanPrice}</div> :
                        <div className="planPrice">
                          <TouchableOpacity onPress={() => handlePlanSelect("", 0)} style={{opacity: 100}}>
                            <PauseCircleFilledIcon fontSize="large" />
                          </TouchableOpacity>
                        </div>
                      }
                    </div>
                  </div>
                  </TouchableOpacity>
              );
          })
        }
      </div>
      <div className="monthlyBox">
      <div className="plantitle">Monthly Plan</div>
        {
          monthly_subs_plans.map(plan => {
              return(
                <TouchableOpacity onPress={() => handlePlanSelect(plan.PlanId, plan.PlanSize, plan.PlanPrice)} disabled={props.itemsCount > plan.PlanSize}>
                  <div className="subsPlanblock">
                  <div className="subsPlanDescBlock" style={{opacity: 1.2 - Math.floor(props.itemsCount>plan.PlanSize)}}>
                    <div className="planName">{plan.PlanName}</div>
                    <div className="planDesc">{plan.PlanDescription}</div>
                  </div>
                  <div className="subsPlanPriceBlock">
                    {
                      (plan.PlanId != props.selectedPlanId) ?
                      <div className="planPrice"  style={{opacity: 1.2 - Math.floor(props.itemsCount>plan.PlanSize)}}>${plan.PlanPrice}</div> :
                      <div className="planPrice">
                        <TouchableOpacity onPress={() => handlePlanSelect("", 0)} style={{opacity: 100}}>
                          <PauseCircleFilledIcon fontSize="large" />
                        </TouchableOpacity>
                      </div>
                    }
                  </div>
                </div>
                </TouchableOpacity>
              );
          })
        }
      </div>
    </div>
    </main>

    </div>
      );
}

export default SubsPlans;
