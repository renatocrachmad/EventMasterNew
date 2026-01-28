export const initPayPal = (planData, onSuccess, onError) => {
  window.paypal.Buttons({
    createSubscription: function(data, actions) {
      return actions.subscription.create({
        'plan_id': planData.paypalPlanId
      });
    },
    onApprove: function(data, actions) {
      onSuccess(data.subscriptionID);
    },
    onError: function(err) {
      onError(err);
    }
  }).render('#paypal-button-container');
};