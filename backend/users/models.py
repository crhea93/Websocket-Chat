from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUser(AbstractUser):
    """
    Our model for the User in the Cadena Project.
    """
    email = models.EmailField(_('email address'), unique=True)  # Email address (required)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)  # First name (optional)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)  # Last name (optional)


    def __str__(self):  # How the user will be displayed upon printing
        return (f"{self.id} / {self.email}")

    def update(self, form_info):
        """Update the model.
        Parameters
        ----------
        form_info : dict
            The dictionary of updated values.
        """

        if self._state.adding:
            raise self.DoesNotExist
        for field, value in form_info.items():
            # Let's get updating

            setattr(self, field, value)
        # And finally save
        self.save(update_fields=list(form_info.keys()))

