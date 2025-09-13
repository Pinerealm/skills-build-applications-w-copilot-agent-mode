from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Workout, LeaderboardEntry

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_user_list(self):
        response = self.client.get(reverse('user-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TeamTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser2', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.team.members.add(self.user)

    def test_team_list(self):
        response = self.client.get(reverse('team-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class ActivityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser3', password='testpass')
        self.activity = Activity.objects.create(user=self.user, activity_type='Run', duration=30, calories_burned=200, date='2025-09-13')

    def test_activity_list(self):
        response = self.client.get(reverse('activity-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WorkoutTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='Easy', suggested_for='Beginners')

    def test_workout_list(self):
        response = self.client.get(reverse('workout-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class LeaderboardEntryTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser4', password='testpass')
        self.entry = LeaderboardEntry.objects.create(user=self.user, score=100, rank=1)

    def test_leaderboard_list(self):
        response = self.client.get(reverse('leaderboardentry-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
