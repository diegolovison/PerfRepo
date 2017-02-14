(function() {
    'use strict';

    angular
        .module('org.perfrepo.testExecution')
        .service('testExecutionService', TestExecutionService);

    function TestExecutionService($http, $resource, API_TEST_EXECUTION_URL, testExecutionSearchService) {

        var testExecutionResource = $resource(API_TEST_EXECUTION_URL + '/:id',
            {
                id: '@id'
            },
            {
                'update': {
                    method: 'PUT',
                    isArray: false,
                    url:  API_TEST_EXECUTION_URL,
                    params: {}
                },
                'save': {
                    method: 'POST',
                    interceptor: {
                        response: function(response) {
                            return response.headers("Location").split("/").pop();
                        }
                    }
                }
            });

        return {
            search: search,
            defaultSearch: defaultSearch,
            getById: getById,
            save: save,
            update: update,
            remove: remove,
            getDefaultSearchParams: getDefaultSearchParams,
            searchLastForTest: searchLastForTest,
            updateParameters: updateParameters,
            uploadAttachment: uploadAttachment,
            downloadAttachmentLink: downloadAttachmentLink,
            addExecutionValues: addExecutionValues,
            setExecutionValues: setExecutionValues
        };

        function search(searchParams) {
            return $http.post(API_TEST_EXECUTION_URL + '/search', searchParams).then(function(response) {
                return {
                    data : response.data,
                    totalCount : parseInt(response.headers('X-Pagination-Total-Count')),
                    pageCount : parseInt(response.headers('X-Pagination-Page-Count')),
                    currentPage : parseInt(response.headers('X-Pagination-Current-Page'))
                };
            });
        }

        function searchLastForTest(testUID) {
             var searchParams = {
                 limit: 3,
                 offset: 0,
                 orderBy: 'DATE_DESC',
                 testUidFilters: [testUID]
             };

             return search(searchParams);
        }

        function defaultSearch(defaultFilters) {
            var defaultSearchParams =  getDefaultSearchParams();

            if (defaultFilters) {
                var filters = testExecutionSearchService.convertFiltersToCriteriaParams(defaultFilters);
                angular.extend(defaultSearchParams, filters);
            }

            return search(defaultSearchParams);
        }

        function getDefaultSearchParams() {
            return {
                limit: 10,
                offset: 0,
                orderBy: 'NAME_ASC'
            };
        }

        function getById(id) {
            return testExecutionResource.get({id: id}).$promise;
        }

        function save(testExecution) {
            return testExecutionResource.save(testExecution).$promise;
        }

        function update(testExecution) {
            return testExecutionResource.update(testExecution).$promise;
        }

        function remove(id) {
            return testExecutionResource.delete({id: id}).$promise;
        }

        function updateParameters(id, parameters) {
            return $http.put(API_TEST_EXECUTION_URL + '/' + id + '/parameters', parameters);
        }

        function downloadAttachmentLink(id) {
            return API_TEST_EXECUTION_URL + '/attachments/download/' + id;
        }

        function uploadAttachment(formData) {
            return $http({
                url: API_TEST_EXECUTION_URL + '/attachments/upload',
                method: 'POST',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        function addExecutionValues(testExecutionId, metricId, valueObjects) {
            return $http.post(API_TEST_EXECUTION_URL + '/' + testExecutionId + '/values/' + metricId, valueObjects);
        }

        function setExecutionValues(testExecutionId, metricId, valueObjects) {
            return $http.put(API_TEST_EXECUTION_URL + '/' + testExecutionId + '/values/' + metricId, valueObjects);
        }
    }
})();