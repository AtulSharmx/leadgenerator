import requests
import sys
import json
from datetime import datetime

class LeadRadarAPITester:
    def __init__(self, base_url="https://380c3772-d11d-4f55-8474-729972a1d8ed.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        default_headers = {'Content-Type': 'application/json'}
        if headers:
            default_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=default_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=default_headers, timeout=30)

            success = response.status_code == expected_status
            
            result = {
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_data': None,
                'error': None
            }
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result['response_data'] = response.json()
                except:
                    result['response_data'] = response.text[:200] if response.text else "No content"
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result['error'] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result['error'] = response.text[:200] if response.text else "No error details"
                    print(f"   Error: {result['error']}")

            self.test_results.append(result)
            return success, result['response_data']

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                'test_name': name,
                'endpoint': endpoint,
                'method': method,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_data': None,
                'error': str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        if success and response:
            print(f"   Health status: {response.get('status')}")
            print(f"   Timestamp: {response.get('timestamp')}")
        return success

    def test_search_endpoint(self):
        """Test search endpoint with mock data"""
        success, response = self.run_test(
            "Search Businesses",
            "POST",
            "api/search",
            200,
            data={"city": "New York", "niche": "Gym"}
        )
        if success and response:
            print(f"   Total businesses found: {response.get('total', 0)}")
            print(f"   Has website: {response.get('hasWebsite', 0)}")
            print(f"   No website: {response.get('noWebsite', 0)}")
            businesses = response.get('businesses', [])
            if businesses:
                print(f"   First business: {businesses[0].get('name', 'N/A')}")
        return success, response

    def test_search_validation(self):
        """Test search endpoint validation"""
        # Test missing city
        success1, _ = self.run_test(
            "Search Validation - Missing City",
            "POST",
            "api/search",
            400,
            data={"niche": "Gym"}
        )
        
        # Test missing niche
        success2, _ = self.run_test(
            "Search Validation - Missing Niche",
            "POST",
            "api/search",
            400,
            data={"city": "New York"}
        )
        
        # Test empty data
        success3, _ = self.run_test(
            "Search Validation - Empty Data",
            "POST",
            "api/search",
            400,
            data={}
        )
        
        return success1 and success2 and success3

    def test_export_csv(self, businesses):
        """Test CSV export endpoint"""
        if not businesses:
            print("⚠️  Skipping CSV export test - no businesses data")
            return False
            
        success, response = self.run_test(
            "Export CSV",
            "POST",
            "api/export/csv",
            200,
            data={"businesses": businesses[:5]}  # Test with first 5 businesses
        )
        return success

    def test_export_pdf(self, businesses):
        """Test PDF export endpoint"""
        if not businesses:
            print("⚠️  Skipping PDF export test - no businesses data")
            return False
            
        success, response = self.run_test(
            "Export PDF",
            "POST",
            "api/export/pdf",
            200,
            data={
                "businesses": businesses[:5],
                "city": "New York",
                "niche": "Gym"
            }
        )
        return success

    def test_export_excel(self, businesses):
        """Test Excel export endpoint"""
        if not businesses:
            print("⚠️  Skipping Excel export test - no businesses data")
            return False
            
        success, response = self.run_test(
            "Export Excel",
            "POST",
            "api/export/excel",
            200,
            data={"businesses": businesses[:5]}
        )
        return success

    def test_export_validation(self):
        """Test export endpoints validation"""
        # Test CSV with empty businesses
        success1, _ = self.run_test(
            "CSV Export Validation - Empty Businesses",
            "POST",
            "api/export/csv",
            400,
            data={"businesses": []}
        )
        
        # Test PDF with empty businesses
        success2, _ = self.run_test(
            "PDF Export Validation - Empty Businesses",
            "POST",
            "api/export/pdf",
            400,
            data={"businesses": []}
        )
        
        # Test Excel with empty businesses
        success3, _ = self.run_test(
            "Excel Export Validation - Empty Businesses",
            "POST",
            "api/export/excel",
            400,
            data={"businesses": []}
        )
        
        return success1 and success2 and success3

    def test_auth_me_unauthenticated(self):
        """Test /me endpoint without authentication"""
        success, response = self.run_test(
            "Auth Me - Unauthenticated",
            "GET",
            "api/auth/me",
            401
        )
        return success

    def test_auth_session_validation(self):
        """Test session endpoint validation"""
        # Test missing session ID
        success1, _ = self.run_test(
            "Auth Session - Missing Session ID",
            "POST",
            "api/auth/session",
            400,
            data={}
        )
        
        # Test empty session ID
        success2, _ = self.run_test(
            "Auth Session - Empty Session ID",
            "POST",
            "api/auth/session",
            400,
            data={"sessionId": ""}
        )
        
        return success1 and success2

    def print_summary(self):
        """Print test summary"""
        print(f"\n{'='*60}")
        print(f"📊 TEST SUMMARY")
        print(f"{'='*60}")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        # Print failed tests
        failed_tests = [r for r in self.test_results if not r['success']]
        if failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"   • {test['test_name']}: {test['actual_status']} (expected {test['expected_status']})")
                if test['error']:
                    print(f"     Error: {test['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    print("🚀 Starting LeadRadar API Tests")
    print("="*60)
    
    tester = LeadRadarAPITester()
    
    # Test health endpoint first
    if not tester.test_health_endpoint():
        print("❌ Health check failed - stopping tests")
        tester.print_summary()
        return 1
    
    # Test search functionality
    search_success, search_data = tester.test_search_endpoint()
    businesses = search_data.get('businesses', []) if search_data else []
    
    # Test search validation
    tester.test_search_validation()
    
    # Test export endpoints if we have business data
    if businesses:
        tester.test_export_csv(businesses)
        tester.test_export_pdf(businesses)
        tester.test_export_excel(businesses)
    
    # Test export validation
    tester.test_export_validation()
    
    # Test auth endpoints
    tester.test_auth_me_unauthenticated()
    tester.test_auth_session_validation()
    
    # Print final summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())