(function() {
	angular.module('APTPS_ngCPQ').service('PricingMatrixDataService', PricingMatrixDataService); 
	PricingMatrixDataService.$inject = ['$q', '$log', 'BaseService', 'QuoteDataService', 'RemoteService'];
	function PricingMatrixDataService($q, $log, BaseService, QuoteDataService, RemoteService) {
		var service = this;

		service.pricingMatrixSearchRes = {};
		service.isValid = false;
		service.firstPMRecordId = null;
		
		// Pricing Methods.
		service.getPricingMatrix = getPricingMatrix;
		service.setfirstPricingMatrixRecord = setfirstPricingMatrixRecord;

		function getPricingMatrix() {
			if (service.isValid) {
				// logTransaction(cachedLocations);
				return $q.when(service.pricingMatrixSearchRes);
			}
			
			var requestPromise = RemoteService.getPricingMatrixData(QuoteDataService.getbundleproductId());
			BaseService.startprogress();// start progress bar.
			return requestPromise.then(function(response){
				service.isValid = true;
				service.pricingMatrixSearchRes = response;
				BaseService.setPricingMatrixLoadComplete();
				// logTransaction(response, categoryRequest);
				return service.pricingMatrixSearchRes;
			});
		}

		function setfirstPricingMatrixRecord(pmId){
			service.firstPMRecordId = pmId;
		}
		
	}
})();