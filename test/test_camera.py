#!/usr/bin/env python

# Use these command in python shell to keep polling imgs
import os, sys
from HardwareRepository import HardwareRepository as hwr

# Path to custom ho classes
fname = '/opt/mxcube3/mxcube3/HardwareRepository/'
hwr.addHardwareObjectsDirs([os.path.join(fname, 'HardwareObjects')])

# Path to xmls
my_hwr = hwr.HardwareRepository('/opt/mxcube3/test/HardwareObjectsMockup.xml/')
my_hwr.connect()
print('my_hwr = ' + str(my_hwr))

# Load camera ho by xml
ho_cam = my_hwr.getHardwareObject('md_camera')
print('Loaded camera ho')
print('type(ho_cam) = ' + str(ho_cam))

error_cam = ho_cam.getCameraImage()
print('error = ' + str(error_cam))

print('ho_cam.imgArray = ' + str(ho_cam.imgArray))
