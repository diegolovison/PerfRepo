(function() {
    'use strict';

    angular
        .module('org.perfrepo.test.metric.edit')
        .controller('EditMetricController', EditMetricController);

    function EditMetricController(_metric, _comparators, metricService, validationHelper, $modalInstance) {
        var vm = this;
        vm.comparators = _comparators;
        vm.metric = _metric;
        vm.save = save;
        vm.cancel = cancel;

        function save(metric, form) {
            metricService.update(metric).then(function () {
                $modalInstance.close(metric);
            }, function(errorResponse) {
                validationHelper.setFormErrors(errorResponse, form);
            });
        }

        function cancel() {
            $modalInstance.dismiss('cancel');
        }
    }
})();