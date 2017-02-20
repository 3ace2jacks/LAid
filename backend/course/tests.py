from django.test import TestCase
from django.utils.timezone import now
from course.models import Course, Lecture, CourseMembership


class CourseTestCase(TestCase):
    def setUp(self):
        Course.objects.create(code="TDT4140", name="Programvareutvikling",
                              year=2017)
        Course.objects.create(code="TMA4100", name="Matte 1", year=2017)

    def test_course_str(self):
        """Courses correct output __str__"""
        pu = Course.objects.get(code="TDT4140")
        matte1 = Course.objects.get(code="TMA4100")
        self.assertEqual(pu.__str__(), 'TDT4140 - Programvareutvikling')
        self.assertEqual(matte1.__str__(), 'TMA4100 - Matte 1')


class LectureTestCase(TestCase):
    def setUp(self):
        date = now()
        Course.objects.create(code="TDT4140", name="Programvareutvikling",
                              year=2017)
        course_id = Course.objects.get(code="TDT4140")
        Lecture.objects.create(title="Architectural Design",
                               start_time=date,
                               end_time=date, course=course_id)
        Lecture.objects.create(title="Taylor", start_time=date,
                               end_time=date, course=course_id)

    def test_course_str(self):
        """Lecture correct output __str__"""
        ad = Lecture.objects.get(title="Architectural Design")
        t = Lecture.objects.get(title="Taylor")
        self.assertEqual(ad.__str__(), 'Architectural Design')
        self.assertEqual(t.__str__(), 'Taylor')

